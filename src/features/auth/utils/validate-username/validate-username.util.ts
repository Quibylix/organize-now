export function validateUsername(username: unknown) {
  if (typeof username !== "string") {
    return { success: false, error: "Username must be a string" };
  }

  if (username.trim().length < 3 || username.trim().length > 25) {
    return {
      success: false,
      error: "Username must be between 3 and 20 characters",
    };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
    return {
      success: false,
      error: "Username must only contain letters, numbers, and underscores",
    };
  }

  return { success: true };
}
