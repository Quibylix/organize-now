export function validatePassword(password: unknown) {
  if (typeof password !== "string") {
    return { success: false, error: "Password must be a string" };
  }

  if (password.length < 8 || password.length > 50) {
    return {
      success: false,
      error: "Password must be between 8 and 50 characters",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one lowercase letter",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one uppercase letter",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      success: false,
      error: "Password must contain at least one number",
    };
  }

  return { success: true };
}
