use axum::response::Html;
use dioxus::prelude::*;

pub mod main_css;

type Element = LazyNodes<'static, 'static>;

#[axum::debug_handler]
pub async fn get() -> Html<String> {
    Html(render_get())
}

pub fn render_get() -> String {
    dioxus_ssr::render_lazy(App())
}

fn App() -> Element {
    rsx!(Layout("folk art", Body()))
}

fn Layout(title: &'static str, body: Element) -> Element {
    rsx!(
        head {
            meta { charset: "UTF-8" }
            meta { content: "width=device-width, initial-scale=1.0", name: "viewport" }
            meta { http_equiv: "X-UA-Compatible", content: "ie=edge" }
            link { rel: "stylesheet", href: "main.css" }
            title { "{title}" }
        }
        body { body }
    )
}

fn Body() -> Element {
    let song_titles = vec!["a", "b", "c"];
    rsx!(
        div {
            h1 { class: "bg-red-500", "High-Five counter" }
            ul {
                for song_title in song_titles.into_iter() {
                    Song(song_title)
                }
            }
        }
    )
}

fn Song(title: &'static str) -> Element {
    rsx!( li { "song: {title}" } )
}
