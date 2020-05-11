import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
  root: {
    height: 16,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'sticky'
  },
}));

export default function ProgressBar(props) {
  const classes = useStyles();

  let progressValue = (props.progress / props.stepsCount) * 100
  return (
    <div className={classes.root}>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={progressValue}
      />
      <div className='progress-label'>
        Step {props.progress} of {props.stepsCount} { props.progress === props.stepsCount ? ' Finished' : '' }
      </div>
    </div>
  )
}