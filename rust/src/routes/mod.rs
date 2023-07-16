use axum::response::Html;

use crate::templates;
pub mod main_css;

#[axum::debug_handler]
pub async fn get() -> Html<String> {
    Html(templates::render())
}
