export async function signupUser({ name, email, password }) {
  const response = await fetch('http://localhost:3001/api/user/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // added
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to signup');
  }

  return response.json();
}

 
export async function loginUser({ email, password }) {
  const response = await fetch('http://localhost:3001/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Wrong password or Email');
  }

  return response;
}

export async function logoutUser() {
  const response = await fetch('http://localhost:3001/api/user/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}


