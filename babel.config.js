module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ["nativewind/babel", [
    "module-resolver",
    {
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
      alias: {
        "@src": ["./src"],
        "@app": ["./"],
      },
    },
  ],],
};
