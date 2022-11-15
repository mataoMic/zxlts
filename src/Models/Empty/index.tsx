
import EmptyPic from '../../asset/imgage/empty.png';
import './index.scss';
function Empty () {
  return <div className='empty-container'>
    <img src={EmptyPic} alt="" />
    <p className='empty-text-label'>No Data</p>
    <p className='empty-text-sub-label'>Please check the current monthly data after 2nd</p>
  </div>
}
export default Empty