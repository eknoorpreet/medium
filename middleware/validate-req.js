import { check, validationResult } from 'express-validator';

function validateReq(validations, validationResult) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    console.log(errors);
    res
      .status(422)
      .json({ message: 'Invalid inputs passed, please check your data' });
  };
}

export const validateSignupBody = () =>
  validateReq(
    [
      check('name').not().isEmpty(),
      check('email').normalizeEmail().isEmail(),
      check('password').isLength({ min: 6 }),
    ],
    validationResult
  );

export const validatePostBody = () =>
  validateReq(
    [
      check('title').not().isEmpty(),
      check('body').not().isEmpty(),
      check('tags').not().isEmpty(),
      check('imageCredit').not().isEmpty(),
      check('titleURL').not().isEmpty(),
      // check('author').not().isEmpty(),
    ],
    validationResult
  );
