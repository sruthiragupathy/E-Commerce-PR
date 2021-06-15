import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
const activeStar = {
	color: '#5b21b6',
};

export const StarRatingTool = ({ rating }) => {
	let stars = [];
	for (let i = 1; i <= 5; i++) {
		if (i <= rating) {
			stars.push(<StarIcon style={activeStar} />);
		} else {
			stars.push(<StarBorderIcon />);
		}
	}
	return <div className='star-rating'>{stars}</div>;
};
