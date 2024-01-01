import React from 'react'
import { Link,Outlet } from 'react-router-dom'


export default function Modal() {
  return (
    <div>
    <main id="main" className="main">
  <div className="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>{/* End Page Title */}
  <section className="section dashboard">
    <h1>this is modal</h1>
    <div class="card">
            <div class="card-body">
              <h5 class="card-title">Vertically Centered</h5>
              <p>Add <code>.modal-dialog-centered</code> to <code>.modal-dialog</code> to vertically center the modal.</p>

              {/* <!-- Vertically centered Modal --> */}
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#verticalycentered">
                Vertically centered
              </button>
              <div class="modal fade" id="verticalycentered" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                   
                    <div class="modal-body">
                      Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Vertically centered Modal--> */}

            </div>
          </div>
  </section>
</main>{/* End #main */}
<Outlet/>
    </div>
  )
}
