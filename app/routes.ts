import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("./routes/home.tsx"),
    route("library", "./routes/library.tsx"),
    route("login", "./routes/login.tsx"),
    route("signup", "./routes/signup.tsx")
] satisfies RouteConfig