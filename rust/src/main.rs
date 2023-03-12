mod events_api;
mod event_model;
mod event_repo;

use std::sync::Mutex;
use actix_web::{App, HttpResponse, HttpServer, web};
use actix_web::http::header::ContentType;
use serde_json::json;

struct AppStateWithCounter {
    counter: Mutex<i32>, // <- Mutex is necessary to mutate safely across threads
}

async fn index(data: web::Data<AppStateWithCounter>) -> String {
    let mut counter = data.counter.lock().unwrap(); // <- get counter's MutexGuard
    *counter += 1; // <- access counter inside MutexGuard

    format!("Request number: {counter}") // <- response with count
}

async fn about() -> HttpResponse {
    let body = serde_json::to_string(&json!({
        "Cloud":"AWS",
        "Database":"Mongo",
        "Framework":"Actix",
        "Language":"Rust"
    })).unwrap();

    HttpResponse::Ok().content_type(ContentType::json()).body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Note: web::Data created _outside_ HttpServer::new closure
    let counter = web::Data::new(AppStateWithCounter {
        counter: Mutex::new(0),
    });

    HttpServer::new(move || {
        // move counter into the closure
        App::new()
            .app_data(counter.clone()) // <- register the created data
            .route("/", web::get().to(index))
            .route("/about", web::get().to(about))
    })
        .bind(("localhost", 6001))?
        .run()
        .await
}
