use std::fs;

pub fn css() -> String {
    let path = built_css_path();

    fs::read_to_string(path).unwrap()
}

pub fn built_css_path() -> &'static str {
    "target/tailwind/built.css"
}
