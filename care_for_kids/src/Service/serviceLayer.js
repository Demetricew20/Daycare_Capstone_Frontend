import axiosInstance from './axios';


class ServiceLayer {

    registerUser(data){
        return axiosInstance.post('accounts/register/', data);
    }

    loginUser(data){
        return axiosInstance.post('accounts/login/', data);
    }

    // Daycares
    getAllDaycare(){
        return axiosInstance.get('daycares/');
    }
    createDaycare(data){
        return axiosInstance.post('daycares/', data)
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

    //Parent
    getAllParents(){
        return axiosInstance.get('parent/');
    }

    createParent(data){
        return axiosInstance.post('parent/', data);
    }
    //Reviews

}


export default new ServiceLayer();