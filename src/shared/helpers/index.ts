function maskEmail(value: string, mask = '*'): string {
  if (!value && value !== '') {
    return '';
  }

  try {
    return value.replace(
      /^(.{2})(.*)(.{2})(@.*)$/,
      (_, a, b, c, d) => a + b.replace(/./g, mask) + c + d,
    );
  } catch (_) {
    return '';
  }
}

function maskMobileNo(value: string, mask = '*'): string {
  if (!value) {
    return '';
  }

  try {
    return value.replace(
      /^(\d{3})(.*)(\d{3})$/,
      (_, a, b, c) => a + b.replace(/./g, mask) + c,
    );
  } catch (_) {
    return '';
  }
}

function maskCardID(value: string, mask = '*'): string {
  if (!value) {
    return '';
  }

  try {
    return value.replace(
      /^(\d{4})(.*)(\d{3})$/,
      (_, a, b, c) => a + b.replace(/./g, mask) + c,
    );
  } catch (_) {
    return '';
  }
}

export { maskEmail, maskMobileNo, maskCardID };
