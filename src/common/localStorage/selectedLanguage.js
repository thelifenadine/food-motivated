export function loadLanguage() {
  return localStorage.getItem('dogfood_language') || 'en'; // default to english
}

export function saveLanguage(str) {
  localStorage.setItem('dogfood_language', str);
}
