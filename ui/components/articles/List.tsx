import { Link } from '@atoms/Links';
import { ArticleItem } from '@core/models';
import CommentIcon from '@mui/icons-material/Comment';
import {
  Avatar,
  Badge,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';
import { memo, RefObject } from 'react';
import { stringAvatar } from 'ui/utils';

type Props = {
  shoudlSetLastItem: boolean;
  observedItem: RefObject<HTMLDivElement>;
  articles: ArticleItem[];
};

export const ArticlesList = memo<Props>(({ articles, shoudlSetLastItem, observedItem }) => {
  return (
    <List sx={{ width: '100%', maxWidth: '65vw', bgcolor: 'background.paper', minWidth: '320px' }}>
      {articles.map((article, i) => (
        <Paper
          key={article.id}
          sx={{ marginBottom: '1rem' }}
          elevation={3}
          ref={i === articles.length - 1 && shoudlSetLastItem ? observedItem : undefined}
        >
          <ListItem alignItems="flex-start" secondaryAction={<></>}>
            <ListItemAvatar>
              <Avatar {...stringAvatar(`${article.author.first_name} ${article.author.last_name}`)} />
            </ListItemAvatar>
            <ListItemText primary={`${article.title} (${article.created_at})`} secondary={article.preview} />
          </ListItem>
          <Box sx={{ marginLeft: '71px', paddingBottom: '1rem' }}>
            <Button variant="contained" component={Link} noLinkStyle href={`/article/${article.id}`}>
              Read more
            </Button>
            {article.comments ? (
              <Badge variant="dot" color="error" sx={{ marginLeft: '1rem' }}>
                <CommentIcon />
              </Badge>
            ) : null}
          </Box>
        </Paper>
      ))}
    </List>
  );
});
