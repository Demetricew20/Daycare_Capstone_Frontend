import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',

  },
  media: {
    height: '500px',
    paddingTop: '20%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DaycareCards(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };



    const mapGroups = (daycare) => {
        let ageGroupArray = [];
        if(daycare){
            daycare.age_groups.forEach(age => {
                if (age === "http://127.0.0.1:8000/age_groups/1/"){
                    age = "Infant (Younger than 12 months)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_infant, maxCost: daycare.max_cost_infant});
                }
                else if (age ==="http://127.0.0.1:8000/age_groups/2/" ){
                    age = "Young Toddler (1-2 years)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_youth_T, maxCost: daycare.max_cost_youth_T });
                    
                }
                else if (age === 'http://127.0.0.1:8000/age_groups/3/' ){
                    age = "Older Toddler (2-3 years)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_old_T, maxCost: daycare.max_cost_old_T});
                }
                else if (age === 'http://127.0.0.1:8000/age_groups/4/'){
                    age = "Preschooler (3-5 years)"
                    ageGroupArray.push({group: age, minCost: daycare.min_cost_preschool, maxCost: daycare.max_cost_preschool});
                }
            })

        }

        return(
            ageGroupArray.map((group, i) => ( 
                <tr>
                    <td >{group.group}</td>
                    <td style={{textAlign: 'center'}}>{group.minCost}</td>
                    <td style={{textAlign: 'center'}}>{group.maxCost}</td>
                </tr>
            ))
        )

    }

  const mapRating = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'start'}}>
            <span style={{position: 'relative', top: '10px'}}>Avg Parent Rating: </span>
            {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
            <div key={i}>
                {ratingValue <= props.rating ? 
                    <span>
                        <StarIcon
                        style={{fill:'#F7C631'}}
                        fontSize='large' 
                        />
                    </span>
                :  
                    <span>
                        <StarIcon
                        style={{fill:'#A5A8AC'}}
                        fontSize='large' 
                        />
                    </span>
                
                }

            </div>
                );
                })}
        </div> 
    )
}

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.daycareName}
      />
      <CardMedia
        className={classes.media}
        image={props.cardImage}
        title="Daycare Image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            <span>Address:</span>
            <span style={{marginLeft: '7px'}}>{props.street_address} {props.city},&nbsp;{props.state}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            {mapRating()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography ><a style={{cursor: 'pointer'}} href='/daycare-details'>View Daycare</a></Typography>
          <Typography paragraph>
            {/* Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.) */}
          </Typography>
          <Typography>
            <table style={{marginTop: '3rem'}}>
                <tr>
                    <th>Programs</th>
                    <th>Estimated Min Cost</th>
                    <th>Estimated Max Cost</th>
                </tr>
                <tbody >
                    {mapGroups(props.daycare)}
                </tbody>
            </table>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
