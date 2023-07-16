#![allow(non_snake_case)]

use axum::{routing::get, Router};
use std::net::SocketAddr;
use std::{env, fs};

mod assets;
mod routes;

#[tokio::main]
async fn main() {
    match get_mode() {
        Mode::Dev => dev().await,
        Mode::Build => build(),
    }
}

async fn dev() {
    let app = Router::new()
        .route("/", get(routes::get))
        .route("/main.css", get(routes::main_css::get));

    let address = SocketAddr::from(([127, 0, 0, 1], 3000));

    axum::Server::bind(&address)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

fn build() {
    fs::write("target/app/index.html", routes::render_get()).unwrap();
    fs::copy(assets::built_css_path(), "target/app/main.css").unwrap();
}

fn get_mode() -> Mode {
    let args: Vec<String> = env::args().collect();

    let arg = args[1].as_str();

    match arg {
        "build" => Mode::Build,
        "dev" => Mode::Dev,
        _ => panic!("Pass either 'dev' or 'build' as an arg."),
    }
}

enum Mode {
    Dev,
    Build,
}
