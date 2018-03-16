import { compose, toClass, mapProps } from "recompose";
import hook from "./hook";

const mapRef = nameRef =>
  mapProps(({ generateTestHook, ...args }) => ({
    ...args,
    ref: generateTestHook(nameRef)
  }));

const enhancedTestable = nameRef => compose(hook, mapRef(nameRef), toClass);

export default nameRef => enhancedTestable(nameRef);
