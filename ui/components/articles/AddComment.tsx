import { CreateCommentModel } from '@core/models';
import { createComment } from '@core/operations/articles';
import { Alert, Button, CircularProgress, Paper, SxProps, TextField, Theme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { CommentKeys, inputProps, validationRules } from './validation';

const classes: Record<string, SxProps<Theme>> = {
  paper: {
    margin: '0 auto .5rem',
    padding: '1rem',
    maxWidth: '600px',
    width: '100%',
  },
  mb: { marginBottom: '1rem' },
};

type Props = {
  onCreated: () => void;
  uuid: string;
};

const objKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];
const defaultFormData = {
  email: '',
  message: '',
  firstName: '',
  lastName: '',
};
const defaultValidation = {
  email: true,
  message: true,
  firstName: true,
  lastName: true,
};

export const AddComment = memo<Props>(({ uuid, onCreated }) => {
  const [formData, setData] = useState<CreateCommentModel>(defaultFormData);
  const [formValidation, setValidation] = useState<Record<CommentKeys, boolean>>(defaultValidation);
  const [pristine, setPristine] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setPristine(!Object.values(formData).some(v => !!v));
  }, [formData]);

  useEffect(() => {
    if (pristine) return;
    objKeys(formData).forEach(fdKey =>
      setValidation(v => ({ ...v, [fdKey]: validationRules(fdKey)(formData[fdKey]) })),
    );
  }, [formData, pristine]);

  const submitDisabled = useMemo(
    () => pristine || loading || Object.values(formValidation).some(v => !v),
    [pristine, loading, formValidation],
  );

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setError('');
    const key = e.target.name as CommentKeys;
    setData(d => ({ ...d, [key]: e.target.value }));
  }, []);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      setLoading(true);
      e.preventDefault();
      createComment(uuid, formData)
        .then(r => {
          if (r.message === 'ok') {
            onCreated();
            setData(defaultFormData);
            setPristine(true);
            setValidation(defaultValidation);
          } else if (r.errors) {
            setError(
              objKeys(r.errors)
                .map(key => r.errors![key][0])
                .join('\n'),
            );
          }
        })
        .catch(e => setError(JSON.stringify(e)))
        .finally(() => setLoading(false));
    },
    [uuid, formData, onCreated],
  );

  return (
    <Paper elevation={4} sx={classes.paper}>
      <Typography gutterBottom variant="body1">
        Add comment
      </Typography>
      {!!error && <Alert severity="error">{error}</Alert>}
      <Box
        onSubmit={submit}
        component="form"
        display="flex"
        flexDirection="column"
        marginTop="1rem"
        id="add-comment"
      >
        <TextField
          error={!formValidation.email}
          name="email"
          label="Email"
          placeholder="E-mail"
          type="email"
          helperText={!formValidation.email && 'Invalid e-mail'}
          required
          sx={classes.mb}
          onChange={onChange}
          disabled={loading}
          value={formData.email}
        />
        <TextField
          error={!formValidation.firstName}
          name="firstName"
          label="Name"
          placeholder="Name"
          type="text"
          helperText={formData.firstName ? `${formData.firstName.length}/255` : undefined}
          sx={classes.mb}
          onChange={onChange}
          inputProps={inputProps.name}
          disabled={loading}
          value={formData.firstName}
        />
        <TextField
          error={!formValidation.lastName}
          name="lastName"
          label="Surname"
          placeholder="Surname"
          type="text"
          helperText={formData.lastName ? `${formData.lastName.length}/255` : undefined}
          sx={classes.mb}
          onChange={onChange}
          inputProps={inputProps.name}
          disabled={loading}
          value={formData.lastName}
        />
        <TextField
          error={!formValidation.message}
          label="Message"
          name="message"
          placeholder="Message"
          multiline
          rows={4}
          sx={classes.mb}
          helperText={formData.message ? `${formData.message.length}/1000` : undefined}
          onChange={onChange}
          inputProps={inputProps.message}
          disabled={loading}
          value={formData.message}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Button variant="contained" type="submit" disabled={submitDisabled} form="add-comment">
          Add
        </Button>
        {loading && <CircularProgress size={24} sx={{ marginLeft: '1rem' }} />}
      </Box>
    </Paper>
  );
});
