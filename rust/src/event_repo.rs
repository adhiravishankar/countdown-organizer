use std::env;
use dotenv::dotenv;
use mongodb::bson::extjson::de::Error;
use mongodb::bson::oid::ObjectId;
use mongodb::{Client, Collection};
use mongodb::bson::doc;
use mongodb::results::{DeleteResult, InsertOneResult, UpdateResult};
use crate::event_model::Event;

pub struct MongoRepo {
    col: Collection<Event>,
}

impl MongoRepo {
    pub async fn init() -> Self {
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => format!("Error loading env variable"),
        };
        let client = Client::with_uri_str(uri)
            .await
            .expect("error connecting to database");
        let db = client.database("rustDB");
        let col: Collection<Event> = db.collection("User");
        MongoRepo { col }
    }

    pub async fn create_user(&self, new_user: Event) -> Result<InsertOneResult, Error> {
        let new_doc = Event {
            id: uuid::Uuid::new_v4().to_string(),
            name: new_user.name,
            date: new_user.date.to_owned(),
            full_day: new_user.full_day.to_owned(),
        };
        let user = self
            .col
            .insert_one(new_doc, None)
            .await
            .ok()
            .expect("Error creating user");

        Ok(user)
    }

    pub async fn get_user(&self, id: &String) -> Result<Event, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let user_detail = self
            .col
            .find_one(filter, None)
            .await
            .ok()
            .expect("Error getting user's detail");

        Ok(user_detail.unwrap())
    }

    pub async fn update_user(&self, id: &String, new_user: Event) -> Result<UpdateResult, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let new_doc = doc! {
            "$set":
                {
                    "id": new_user.id,
                    "name": new_user.name,
                    "date": new_user.date,
                    "full_day": new_user.full_day,
                },
        };
        let updated_doc = self
            .col
            .update_one(filter, new_doc, None)
            .await
            .ok()
            .expect("Error updating user");
        Ok(updated_doc)
    }

    pub async fn delete_user(&self, id: &String) -> Result<DeleteResult, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let user_detail = self
            .col
            .delete_one(filter, None)
            .await
            .ok()
            .expect("Error deleting user");

        Ok(user_detail)
    }

    pub async fn get_all_users(&self) -> Result<Vec<Event>, Error> {
        let mut cursors = self.col.find(None, None).await.ok()
            .expect("Error getting list of users");
        let mut events: Vec<Event> = Vec::new();
        while let Some(event) = cursors.try_next().await.ok()
            .expect("Error mapping through cursor")
        {
            events.push(event)
        }
        Ok(events)
    }
}