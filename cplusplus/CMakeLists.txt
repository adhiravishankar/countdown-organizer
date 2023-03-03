cmake_minimum_required(VERSION 3.24)
project(cplusplus)

set(CMAKE_CXX_STANDARD 23)

include(FetchContent)
FetchContent_Declare(cpr GIT_REPOSITORY https://github.com/libcpr/cpr.git GIT_TAG 0817715923c9705e68994eb52ef9df3f6845beba)
FetchContent_MakeAvailable(cpr)

add_executable(cplusplus main.cpp)
target_link_libraries(cplusplus PRIVATE cpr::cpr)

