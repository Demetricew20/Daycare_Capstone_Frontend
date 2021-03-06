import axios from 'axios';
import axiosInstance from './axios';


class ServiceLayer {

    registerUser(data){
        return axiosInstance.post('accounts/register/', data);
    }

    loginUser(data){
        return axiosInstance.post('accounts/login/', data);
    }

    getAllUsers(){
        return axiosInstance.get('accounts/users/');
    }

    getUserById(id){
        return axiosInstance.get(`accounts/users/${id}/`)
    }

    // Daycares
    getAllDaycares(){
        return axiosInstance.get('daycares/');
    }
    createDaycare(data){
        return axiosInstance.post('daycares/', data);
    }

    getDaycareById(id){
        return axiosInstance.get(`daycares/${id}/`);
    }
    //Age groups
    getAllAgeGroups(){
        return axiosInstance.get('age_groups/');
    }

    getAgeGroupById(id){
        return axiosInstance.get(`age_groups/${id}/`);
    }

    //Child
    getAllChildren(){
        return axiosInstance.get('child/');
    }

    createChild(data){
        return axiosInstance.post('child/', data)
    }

    getChild(url){
        return axios.get(url);
    }

    //Parent
    getAllParents(){
        return axiosInstance.get('parent/');
    }

    getParentByUserId(id){
        return axiosInstance.get(`parent/${id}`)
    }

    createParent(data){
        return axiosInstance.post('parent/', data);
    }
    //Reviews
    getAllReviews(){
        return axiosInstance.get('daycare_review/')
    }
    
    createReview(data){
        return axiosInstance.post('daycare_review/', data)
    }

}

export default new ServiceLayer();