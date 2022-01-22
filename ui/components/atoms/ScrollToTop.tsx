import NavigationIcon from '@mui/icons-material/Navigation';
import { IconButton, SxProps, Theme } from '@mui/material';
import { memo, PureComponent } from 'react';

type LocalState = {
  show: boolean;
  disabled: boolean;
};

type ScrollButtonProps = {
  position: 'left' | 'right';
};

export class ScrollButton extends PureComponent<ScrollButtonProps, LocalState> {
  static defaultProps: ScrollButtonProps = {
    position: 'left',
  };

  timeInterval: number = 0;
  mounted: boolean = false;

  state: LocalState = {
    show: false,
    disabled: false,
  };

  get checkWindow() {
    if (typeof window !== 'undefined') return true;
    return false;
  }

  componentDidMount() {
    this.mounted = true;
    if (this.checkWindow) {
      this.handleShow();
      window.addEventListener('scroll', this.handleShow);
      window.addEventListener('wheel', this.stopScrolling);
      window.addEventListener('touchstart', this.stopScrolling);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.checkWindow) {
      window.removeEventListener('scroll', this.handleShow);
      window.removeEventListener('wheel', this.stopScrolling);
      window.removeEventListener('touchstart', this.stopScrolling);
      clearInterval(this.timeInterval);
    }
  }

  handleShow = () => {
    if (this.mounted) {
      this.setState({ show: window.pageYOffset > 100 });
    }
  };

  stopScrolling = () => {
    this.setState({ disabled: false });
    clearInterval(this.timeInterval);
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.timeInterval);
    }
    window.scroll(0, window.pageYOffset - 50);
  };

  scrollToTop = () => {
    this.setState(
      {
        disabled: true,
      },
      () => {
        let intervalId = setInterval(this.scrollStep, 16.66);
        this.timeInterval = intervalId as unknown as number;
      },
    );
  };

  render() {
    return (
      <ActionButton
        disabled={this.state.disabled}
        onClick={this.scrollToTop}
        visible={this.state.show}
        position={this.props.position}
      />
    );
  }
}

type Props = {
  onClick: () => void;
  visible: boolean;
  disabled: boolean;
} & ScrollButtonProps;

const scrollTotop = (props: StyleProps): SxProps<Theme> => ({
  position: 'fixed',
  left: props.position === 'left' ? 15 : undefined,
  right: props.position === 'right' ? 15 : undefined,
  bottom: 20,
  opacity: props.visible ? 0.3 : 0,
  visibility: props.visible ? 'visible' : 'hidden',
  transition: '.2s ease-in-out',
  '&:hover': {
    opacity: props.visible ? 0.9 : 0,
    transform: props.visible ? 'scale(1.1)' : 'scale(1)',
  },
});

const ActionButton = memo<Props>(({ onClick, visible, position, disabled }) => {
  return (
    <IconButton
      color="secondary"
      sx={scrollTotop({ visible, position })}
      onClick={onClick}
      disabled={disabled}
    >
      <NavigationIcon />
    </IconButton>
  );
});

type StyleProps = {
  visible: boolean;
} & ScrollButtonProps;
