use askama::Template;

pub fn render() -> String {
    let index = Index {
        body: Body { name: "world" },
    };

    let compiled_template = index.render().unwrap();
}

#[derive(Template)]
#[template(path = "index.html")]
struct Index {
    body: Body,
}

#[derive(Template)]
#[template(path = "body.html")]
struct Body {
    name: &'static str,
}
