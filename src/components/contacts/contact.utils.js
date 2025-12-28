// src/components/contacts/contact.utils.js

export function formatPhone(phone, options = {}) {
  const { withPrefix = false, emptyValue = "-" } = options;

  if (!phone) {
    return withPrefix ? "+48 " : emptyValue;
  }

  // usuwamy wszystko oprócz cyfr
  let digits = String(phone).replace(/\D/g, "");

  // obsługa +48 / 48
  if (digits.startsWith("48")) {
    digits = digits.slice(2);
  }

  // max 9 cyfr (PL)
  digits = digits.slice(0, 9);

  if (digits.length !== 9) {
    return phone;
  }

  const formatted =
    `${digits.slice(0, 3)}-` + `${digits.slice(3, 6)}-` + `${digits.slice(6)}`;

  return withPrefix ? `+48 ${formatted}` : formatted;
}
