import { compose, toClass, mapProps } from "recompose";
import hook from "./hook";

const updateNameRef = (props, nameRef, propName) => {
  if (propName) {
    const propValue = props[propName];
    return propValue ? `${nameRef}.${propValue}` : nameRef;
  }
  return nameRef;
};
const mapRef = nameRef => propName => {
  return mapProps(props => ({
    ...props,
    ref: props.generateTestHook(updateNameRef(props, nameRef, propName))
  }));
};

const enhancedTestable = nameRef => propName =>
  compose(hook, mapRef(nameRef)(propName), toClass);

export default (nameRef, propName = null) =>
  enhancedTestable(nameRef)(propName)

