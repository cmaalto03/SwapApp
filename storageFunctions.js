import * as SecureStore from "expo-secure-store";

//doesnt work in this file for some reason, moved to where function is used
export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log("none");
  }
}

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  console.log(value + " saved!");
}
