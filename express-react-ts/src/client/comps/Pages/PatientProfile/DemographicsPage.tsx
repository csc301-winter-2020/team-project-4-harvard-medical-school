import React, { useEffect, useState } from "react";
import "../../../scss/patient-profiles/demographics.scss";
import { CSSTransition } from "react-transition-group";

interface DemographicsPageProps {
  currentPage: string;
  setCurrentPage: Function;
  transitionDuration: number;
  transitionName: string;
}

export const DemographicsPage: React.FC<DemographicsPageProps> = ({
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
}) => {

  useEffect(() => {
    document.title = "Patient Profile: Demographics";
  });
  return (
    <>
      <CSSTransition
        in={currentPage === "Demographics"}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage("Demographics")}
        classNames={transitionName}
      >
        <div className="demographics-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h1>Demographics</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
              sequi cupiditate amet ab fuga assumenda illum excepturi laboriosam
              magni dignissimos itaque quo dolorem quam tempore animi iure
              exercitationem! Pariatur animi repellat quae dolores doloremque
              aliquam, ex nihil incidunt dolore fuga iusto expedita dolor
              architecto officiis porro dolorem reprehenderit est quisquam?
              Voluptate tempore ex repellendus esse labore libero eveniet alias,
              hic quidem possimus itaque soluta eos quos repudiandae officiis
              enim ab perspiciatis illum inventore maxime deleniti nobis ullam
              assumenda voluptas? Tenetur nihil, fuga sit quia doloremque
              sapiente accusantium maxime odit nesciunt, praesentium
              consectetur? Reprehenderit velit quibusdam ea hic aliquid ab iste
              asperiores soluta nam dolore quod laborum sed, doloribus tempore
              consectetur maiores dolor magni quasi ipsam quia repudiandae
              suscipit facere? Molestiae laudantium saepe ab tenetur voluptatum
              asperiores blanditiis fugiat. Soluta, magnam! Laudantium
              recusandae autem officiis maiores, facere maxime ipsam ipsa ad
              similique natus minus rem optio assumenda ea nesciunt quasi! Dolor
              voluptas maiores quam dolores dolorum totam excepturi voluptate
              quibusdam autem ipsam eaque inventore exercitationem mollitia,
              quo, quas quisquam nihil consectetur necessitatibus voluptatibus
              praesentium odit? Tempore repellat aperiam doloremque corporis
              deserunt corrupti culpa saepe nostrum illo ipsum, numquam officia
              sint quo! Quam velit aliquid atque sint inventore laudantium
              sapiente aliquam iure consectetur. Eos, minima! Officiis, velit
              corporis sed ipsa neque quis veritatis, laboriosam earum qui esse
              hic praesentium officia, id consequuntur. Quisquam excepturi
              dolore cupiditate saepe distinctio, explicabo ducimus dolor,
              debitis dolores asperiores quas et ipsum animi repudiandae harum
              blanditiis temporibus eligendi maxime nisi tempore mollitia
              nostrum assumenda ea esse. Voluptatem, delectus quisquam eligendi
              consequatur quis reprehenderit commodi qui, repellat dicta,
              doloremque culpa est? Aliquid id temporibus consectetur sequi
              suscipit delectus expedita aut praesentium repellat voluptas.
              Quod, hic sed. At illo tenetur perferendis beatae aut
              necessitatibus ad veniam eum quod dolorem, doloremque distinctio
              molestiae, libero, exercitationem neque! At minima perspiciatis
              cupiditate earum consequatur, eos mollitia facere quis delectus
              doloremque animi quaerat ex velit itaque labore iste vitae.
              Repellendus suscipit animi reprehenderit velit magni deserunt
              distinctio natus, commodi illo recusandae, tempora unde facilis!
              Praesentium consequuntur id et laborum perferendis vitae libero
              quaerat dolore recusandae ipsum commodi, eaque labore illo
              possimus modi eius nostrum voluptates qui eligendi tempora itaque
              dolor voluptatem, soluta temporibus. Temporibus debitis rem
              voluptatibus illum incidunt animi officia sint nisi in accusamus
              laboriosam impedit veritatis magnam recusandae cupiditate, quas
              ratione nulla numquam quo, quibusdam vitae, quae unde! Dignissimos
              repudiandae ea voluptatem temporibus beatae voluptate ipsum
              asperiores, unde laboriosam eveniet qui consequuntur provident
              velit officia explicabo distinctio, suscipit doloremque impedit
              fugit modi alias corrupti? Architecto praesentium sapiente magnam
              recusandae autem ut facilis ducimus officiis nihil quam.
              Laboriosam non molestiae, fugit ullam nostrum ad magni temporibus
              aut fuga error mollitia cum corrupti recusandae ea magnam iste
              quos veritatis, laborum nesciunt placeat! Provident, iusto
              adipisci? Officiis modi quisquam maiores illo tenetur pariatur
              dolorem praesentium perspiciatis inventore sed temporibus ratione
              facere corporis doloribus, maxime iste minus harum minima
              voluptatibus a possimus quidem, velit repudiandae. Fuga dolore
              tempore provident soluta et dolor? Quis eos excepturi molestiae
              deleniti, nemo quasi. Facere corrupti deserunt omnis cupiditate
              repellendus.
            </p>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
