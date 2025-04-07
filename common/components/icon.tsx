import '@/common/styles/icon.css';
interface Props {
  name: string;
  size: string;
  classes?: string;
}


const AppIcon = ({ name, size, classes }: Props) => {
  let width!: string;
  let height!: string;

  const result = /^([0-9]+)(?:x([0-9]+))?$/.exec(size);
  if (result) {
    if (result[2]) {
      width = result[1] + 'px';
      height = result[2] + 'px';
    } else {
      width = height = result[1] + 'px';
    }
  } else {
    width = height = '';
  }

  return (
    <svg width={width} height={height} className={classes}>
      <use xlinkHref={`/sprite.svg#${name}`}></use>
    </svg>
  );
};

export default AppIcon;
