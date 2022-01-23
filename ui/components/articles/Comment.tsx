import { CommentModel } from '@core/models';
import { Avatar, Paper, SxProps, Theme, Typography, Zoom } from '@mui/material';
import { memo } from 'react';
import { stringAvatar } from 'ui/utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';

const classes: Record<string, SxProps<Theme>> = {
  paper: {
    margin: '0 auto .5rem',
    padding: '1rem',
    maxWidth: '600px',
    width: '100%',
  },
  avatar: {
    margin: 'auto 1rem auto 0',
  },
  content: {
    overflow: 'hidden',
    wordBreak: 'break-word',
  },
  nickname: {
    maxWidth: 160,
  },
};

export const Comment = memo<CommentModel>(({ author, message }) => {
  return (
    <Zoom in mountOnEnter timeout={1000}>
      <Paper elevation={4} sx={classes.paper}>
        <Box display="flex" marginBottom=".75rem">
          {author.first_name || author.last_name ? (
            <Avatar {...stringAvatar(`${author.first_name} ${author.last_name}`)} />
          ) : (
            <Avatar sx={classes.avatar}>
              <AccountCircleIcon />
            </Avatar>
          )}
          <Box display="flex" justifyContent="center" marginLeft="1rem" alignItems="center">
            <Typography noWrap title={author.first_name} sx={classes.nickname} component="p">
              {author.first_name}
            </Typography>
          </Box>
        </Box>
        <Typography component="p" sx={classes.content}>
          {message}
        </Typography>
      </Paper>
    </Zoom>
  );
});
