import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import serviceLayer from '../../Service/serviceLayer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',

  },
  media: {
    height: '300px',
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
    const [daycare, setDaycare] = useState({
      id: null,
      url: ''
    });
    const [showButton, setShowButton] = useState(false);
    const [user, setUser] = useState();
    const [review, setReview] = useState();
    const [userReview, setUserReview ] = useState({
      user: null,
      daycare: '',
      review_rating: null,
      review_text: '',
      rated: false,
  });
  const [reviews, setReviews] = useState([]);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    useEffect(() => {
      getReviews();
      setUser(props.user);
      if(props.selectedDaycare){
        setDaycare({
          id: props.selectedDaycare.id,
          url: props.selectedDaycare.url
        });
      }
    }, [props])

    async function getReviews(){
      try{
        const response = await serviceLayer.getAllReviews();
        setReviews(response.data);
      }
      catch(err){
        console.log(err);
      }
    }
    console.log(reviews);
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
                <TableRow key={i}>
                    <TableCell>{group.group}</TableCell>
                    <TableCell >${group.minCost}</TableCell>
                    <TableCell >${group.maxCost}</TableCell>
                </TableRow>
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

const mapReviews = () => {

  return (
      reviews.map((review, i) => (
          <div key={i} style={{marginTop: '1rem'}} >
            {daycare.url === review.daycare[0] ? 
              <Typography noWrap>
              <div style={{display: 'flex'}}>
                  <span>{user.username} -</span>
                  <span style={{marginLeft: '10px'}}>{review.review_text}</span> 
                      
              <div style={{display: 'flex', marginLeft: '10px'}} >        
                      {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;

                      return (
                      <div key={i}>
                          {ratingValue <= review.review_rating ? 
                              <span>
                                  <StarIcon
                                  style={{fill:'#F7C631'}}
                                  fontSize='small' 
                                  />
                              </span>
                          :  
                              <span>
                                  <StarIcon
                                  style={{fill:'#A5A8AC'}}
                                  fontSize='small' 
                                  />
                              </span>
                          
                          }

                      </div>
                          );
                          })}
                </div>
                
                </div>
              </Typography>
            : <></>}
          </div>
      ))

  )
}

  const redirectLink = `daycare-details/${props.daycare_id}`
  return (
    <Card className={classes.root} >
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
            {mapRating()}
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
          {/* <Typography ><a style={{cursor: 'pointer'}} href={redirectLink}>View Daycare</a></Typography> */}
          <Typography>
            <TableContainer>
            <Table style={{marginTop: '3rem'}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Programs</TableCell>
                    <TableCell>Estimated Min Cost</TableCell>
                    <TableCell>Estimated Max Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                    {mapGroups(props.daycare)}
                </TableBody>
            </Table>
            </TableContainer>
          </Typography>
          <Typography>
              <Button 
              variant='contained' 
              style={{marginTop: '2rem'}}
              onClick={() => setShowButton(true)}
              >Leave A Review</Button>
          </Typography>
          <Typography>
            {mapReviews()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
