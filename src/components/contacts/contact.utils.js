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

// src/utils/contact.utils.js

export function normalizePhone(phone) {
  if (!phone) return null;

  // zostawiamy tylko cyfry
  let digits = phone.replace(/\D/g, "");

  // jeśli przyszło +48 / 48 → obcinamy
  if (digits.startsWith("48")) {
    digits = digits.slice(2);
  }

  // bierzemy max 9 cyfr (PL)
  return digits.slice(0, 9);
}

export function normalizeContactPayload(form) {
  return {
    first_name: form.first_name?.trim() || "",
    last_name: form.last_name?.trim() || "",
    email: form.email?.trim().toLowerCase() || null,
    role: form.role?.trim() || null,
    mobile_phone: normalizePhone(form.mobile_phone),
  };
}

export function validateContact(form) {
  const errors = {};

  if (!form.first_name || form.first_name.trim().length < 2) {
    errors.first_name = "Min. 2 characters";
  }

  if (!form.email && !form.phone) {
    errors.email = "At least one contact method is required";
    errors.mobile_phone = "At least one contact method is required";
  }
  // EMAIL FORMAT
  if (form.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      errors.email = "Invalid email format";
    }
  }

  // PHONE FORMAT (PL)
  if (form.mobile_phone) {
    const digits = normalizePhone(form.mobile_phone);
    if (!digits || digits.length !== 9) {
      errors.mobile_phone = "9 digits required";
    }
  }

  return errors;
}
