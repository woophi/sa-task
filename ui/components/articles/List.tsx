import { ArticleItem } from '@core/models';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { memo, RefObject } from 'react';
import { stringAvatar } from 'ui/utils';

type Props = {
  shoudlSetLastItem: boolean;
  observedItem: RefObject<HTMLDivElement>;
  articles: ArticleItem[];
};

// TODO: show comments number and link to article detail
export const ArticlesList = memo<Props>(({ articles, shoudlSetLastItem, observedItem }) => {
  return (
    <List sx={{ width: '100%', maxWidth: '65vw', bgcolor: 'background.paper' }}>
      {articles.map((article, i) => (
        <Paper
          key={article.id}
          sx={{ marginBottom: '1rem' }}
          elevation={3}
          ref={i === articles.length - 1 && shoudlSetLastItem ? observedItem : undefined}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar {...stringAvatar(`${article.author.first_name} ${article.author.last_name}`)} />
            </ListItemAvatar>
            <ListItemText primary={article.title} secondary={article.preview} />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
});
