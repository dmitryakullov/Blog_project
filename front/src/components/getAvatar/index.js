import usersPicture from '../../icons/profile-picture.png';
export default function getAvatar(el) {
    return el === 'false'?
    {background: 'url('+ usersPicture +') center center / cover no-repeat'}: 
    {background: 'url('+ el +') center center / cover no-repeat'};
}