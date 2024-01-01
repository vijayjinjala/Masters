import React from 'react';
import Swal from 'sweetalert2'



const Randertable = (props) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success m-1',
        cancelButton: 'btn btn-danger m-1'
    },
    buttonsStyling: false
})

const editdata=(id)=>{
//   console.log(JSON.stringify({id:id})); 
//    const options = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     //  body:JSON.stringify({values})
//     };
//     fetch(`http://localhost:4040/get-states?id=${id}`, options)
//       .then(response => response.json())
//       .then((response) => {
       props.editcallback(id);
//   })
//   .catch((err) => {
//     alert("Server Down")
//     console.error(err)

//   });
}  

    const deletedata = (id) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed){
                props.deletedatacallback(id)
            }
            if (result.isConfirmed) {
                // const options = {
                //     method: 'PUT',
                //     headers: { 'Content-Type': 'application/json' },
                // };
                // fetch(`http://localhost:4040/put-states?id=${id}`, options)
                //     .then(response => response.json())
                //     .then((response) => {
                //         if (response.status === 1) {
                //             swalWithBootstrapButtons.fire(
                //                 'Deleted!',
                //                 'Your file has been deleted.',
                //                 'success'
                //             )
                //             props.deletedatacallback();
                //         } else {
                //             swalWithBootstrapButtons.fire(
                //                 'Cancelled',
                //                 (response.message),
                //                 'error'
                //             )
                //         }
                //     })
                //     .catch((err) => {
                //         Swal.fire({
                //             icon: 'error',
                //             title: 'Oops...',
                //             text: 'Something went wrong!',
                //         })
                //         console.error(err)
                //     });
            }else
             if(result.dismiss === Swal.DismissReason.cancel){
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                    )
                }

        })
    }

        const tableheader = () =>{
            return props.header.map((element)=>{
                return <th scope='col'>{element}</th>
            })
        }
      
        const tablefooter = (props)=>{
            var i=0;
            return props.tabledata.map((element) => {
                var keys=Object.keys(element);
                console.log(element.data);
                i++;

                var j=-1;
                return(
                    <tr className='table-info'>
                        <th scope='row'>{i}</th>{
                            Object.values(element).map((values)=>{
                                j++;
                                if(keys[j]!=='_id' && keys[j] !='__v'){
                                    return <td>{values}</td>
                                }
                            })                           
                        }
                        <td>
                            <div className='row'>
                                <div className='col'>
                            <button type='button' className='btn btn-danger me-3'><i class="bi bi-pencil-square" onClick={()=>editdata(element._id)}></i></button>
                                </div>
                                <div className='col'>
                            <button type='button' className='btn btn-warning me-3' onClick={()=> deletedata(element._id)}><i class="bi bi-trash3-fill"></i></button>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
    

  return (
    <div>
      <table class="table">
        <thead>
            <tr>{tableheader(props)}</tr>
        </thead>
        <tbody>
            {tablefooter(props)}
        </tbody>
      </table>
    </div>
  )
}

export default Randertable;