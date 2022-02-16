import { writable } from "svelte/store";
import { LOCAL_STORAGE_PICKED_EMOJI_KEY } from "./constants";

export const emojis = writable([
  {
    text: 'Positive',
    emojis: ['✅', '🎯', '👌', '👍']
  },
  {
    text: 'Negative',
    emojis: ['❌', '❎', '🅾', '⭕', '⛔', '🚫']
  },
  {
    text: 'Neutral',
    emojis: ['👉', '➡', '▶', '✴', '⚫', '⚪', '🔴', '🔵', '💠', '🔶', '🔷', '🔸', '🔹', '🔰', '⬜']
  }
]);


const storedEmoji = localStorage.getItem(LOCAL_STORAGE_PICKED_EMOJI_KEY);

export const pickedEmoji = writable(storedEmoji === 'null' || storedEmoji === null || storedEmoji === undefined ? '✅' : storedEmoji);
pickedEmoji.subscribe(value => {
  localStorage.setItem(LOCAL_STORAGE_PICKED_EMOJI_KEY, value);
})