import { CreateCommentModel } from '@core/models';

export type CommentKeys = keyof CreateCommentModel;

export const testEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validationRules = <T extends CommentKeys>(key: T) => {
  return {
    email: (value: CreateCommentModel[T]) => !!value && testEmail.test(value),
    message: (value: CreateCommentModel[T]) => !!value && value.length >= 4 && value.length <= 1000,
    lastName: (value: CreateCommentModel[T]) => !value || (value && value.length <= 255),
    firstName: (value: CreateCommentModel[T]) => !value || (value && value.length <= 255),
  }[key];
};

export const inputProps = {
  message: {
    minLength: 4,
    maxLength: 1000,
  },
  name: {
    maxLength: 255,
  },
};
