import { getSession } from 'next-auth/react';
const { NextResponse } = require('next/server');

export function checkAuth() {
  return async function (req, res, next) {
    const session = await getSession({ req });

    if (!session) return res.redirect('/api/auth');
    req.user = session.user;
    return next();
  };
}
