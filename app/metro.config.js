const {
  withNativeWind: withNativeWind
} = require("nativewind/metro");

const {getDefaultConfig} = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');

module.exports = withNativeWind(config, {
  input: "./global.css"
});