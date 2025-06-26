import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./components/ui/layout.tsx", [
    index("./routes/home.tsx"),
    route("menu", "./routes/menu.tsx"),
  ]),
] satisfies RouteConfig;
