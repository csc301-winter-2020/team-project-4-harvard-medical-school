import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";

export const ReviewOfSystemsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  patientID
}) => {
  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/reviewofsystems`);
    }
  }, [currentPage]);
  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div className="review-of-systems-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h1>{pageName}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              repellat explicabo iste neque? Fugit sint voluptate temporibus
              vero debitis qui recusandae neque labore? Odio saepe, vel
              voluptatum nam mollitia magnam atque nobis, explicabo rem vitae ab
              ut neque accusantium quo eligendi in provident eos! Facere,
              tempore distinctio non minima suscipit amet quos expedita
              dignissimos autem aspernatur molestiae? Dolorem veniam odit iste
              fugiat repellat quo ducimus eum, earum dolores corrupti incidunt?
              Dolores quas architecto veritatis eius exercitationem, beatae
              maxime laborum. Nemo, blanditiis corrupti ducimus reiciendis
              nesciunt temporibus, natus, perferendis id non animi illo placeat
              aliquid. Dignissimos, dolorem officiis a tempore ducimus quibusdam
              ratione quos nostrum accusamus illo iste harum quidem eum? Nemo
              quidem distinctio magnam iste fugit delectus illum, omnis,
              reprehenderit, fuga quibusdam facere odio. Ad nesciunt recusandae
              eaque iure omnis sed laudantium id dolorem beatae esse, repellat
              temporibus et, numquam mollitia nostrum ducimus sequi est.
              Laudantium aliquid facilis natus eaque, assumenda pariatur
              quisquam delectus ea magnam error at odio sunt quod quidem
              temporibus! Corporis error perspiciatis facilis, repellat tenetur
              natus pariatur ipsam? Maxime sint labore ducimus voluptates?
              Aspernatur placeat quisquam consequatur nobis assumenda rem sunt,
              fugiat ut atque nisi! Repellat non doloribus dolores fuga error,
              officia, adipisci rem corrupti corporis velit quisquam sunt nobis
              animi eius rerum incidunt accusantium quibusdam. Accusantium at,
              necessitatibus rerum libero, perspiciatis aspernatur sit
              reprehenderit cum, impedit quis pariatur laboriosam voluptas
              dolore et voluptatibus sint unde esse. Neque officiis, iure
              ducimus optio rem ab veritatis iste sapiente inventore, id
              necessitatibus aperiam ipsum deserunt dolores cupiditate, delectus
              esse eaque molestiae animi explicabo qui consectetur cumque
              aliquam quos. Ab ex recusandae eligendi similique, autem doloribus
              dignissimos deleniti repudiandae reiciendis delectus error sed
              odio. Id delectus tempore alias ea neque reiciendis a ut est quia
              rerum dolores suscipit, provident explicabo excepturi totam veniam
              quo consequuntur quisquam illum eum! Culpa, ut non. Explicabo
              adipisci numquam perferendis dolore nemo natus vel at possimus
              voluptas blanditiis, eos iste quasi ipsum inventore amet
              praesentium, perspiciatis tenetur dolorem est non vero laudantium
              debitis nobis pariatur! Ipsum, est. Enim cumque et eligendi
              dolores laborum pariatur eius cum consectetur cupiditate animi!
              Esse ipsam, officiis necessitatibus dolore iste exercitationem
              sapiente voluptatem tempore illum eum optio, explicabo veniam
              consectetur ea tenetur, nihil similique molestias blanditiis
              facilis consequatur possimus expedita nostrum nam. Corrupti,
              dolorem! Modi et consequatur corporis ullam sint blanditiis? Nemo
              dolore voluptatem, corporis temporibus voluptas voluptatum odit
              repellendus tempora commodi quia cum nesciunt vitae beatae quae
              vel. Asperiores, minima consequuntur? Itaque architecto tenetur
              molestias sunt cupiditate nesciunt, maiores sed obcaecati
              asperiores odit magnam temporibus incidunt nobis assumenda eos,
              fuga eum animi voluptatum facere in quo at tempore aspernatur.
              Dolor laudantium impedit nostrum rerum quo at libero eius tenetur
              dolorem non laborum ipsum tempora amet veniam sed enim quos nisi
              adipisci placeat, nulla assumenda in inventore unde mollitia! Nisi
              odio suscipit dolores laudantium ut omnis, illo, cumque incidunt
              ab similique iure consequuntur placeat qui odit. Atque placeat quo
              quidem maxime iusto ducimus minus consequuntur sequi deleniti
              numquam exercitationem ut delectus eius possimus eligendi, quam ab
              sapiente! Sapiente, voluptate.
            </p>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
