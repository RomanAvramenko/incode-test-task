const { configure, mount, shallow, render } = require("enzyme");
const toJson = require("enzyme-to-json");
const Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
