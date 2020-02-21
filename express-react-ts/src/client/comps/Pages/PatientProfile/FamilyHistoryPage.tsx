import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

interface FamilyHistoryPageProps {
  currentPage: string;
  setCurrentPage: Function;
  transitionDuration: number;
  transitionName: string;
}

export const FamilyHistoryPage: React.FC<FamilyHistoryPageProps> = ({
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
}) => {
  useEffect(() => {
    document.title = "Patient Profile: Social History";
  });
  return (
    <>
      <CSSTransition
        in={currentPage === "Family History"}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage("Family History")}
        classNames={transitionName}
      >
        <div className="family-history-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h1>Family History</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa aut autem maxime accusamus consectetur, molestias rem veritatis, corrupti fugit odio dolore, a similique asperiores in. Dicta commodi nam nemo placeat corporis odio nisi, nihil accusantium corrupti! Laborum maiores velit, nulla corrupti explicabo ipsam dignissimos voluptates quasi dolores quod minus nisi corporis, pariatur, maxime debitis! Porro neque fugit consequuntur eius magni laudantium quaerat, aspernatur obcaecati reiciendis dolores officiis sint eaque odit praesentium ratione corporis deleniti asperiores culpa voluptatum possimus. Voluptatem, doloribus quam neque vel assumenda laboriosam consequatur molestiae ea consequuntur suscipit, eaque deleniti magnam! Consequuntur, consectetur obcaecati, impedit debitis inventore dicta non beatae natus aperiam cupiditate ea. Id cupiditate nostrum libero ipsum asperiores dicta laudantium, recusandae facere amet qui, velit vero labore fugit quam soluta ea. Minima nisi hic quis dolor, deleniti dolores veniam doloribus temporibus asperiores aut ipsam nam adipisci itaque maxime sapiente illum magnam, expedita earum ut quae beatae laudantium. Numquam nihil quisquam, ratione ea voluptates reiciendis aliquam enim tempora necessitatibus temporibus facere, unde natus alias. Corrupti ex, quia delectus placeat pariatur quibusdam magni rerum, alias eaque quasi eveniet impedit ab tempore molestias quod dolores dignissimos. Illum minus ipsa possimus dignissimos architecto necessitatibus laudantium, laboriosam dolorem quasi non eligendi vero perspiciatis cumque cupiditate quidem magnam beatae! Molestias dolorum cupiditate consequatur ad, dignissimos aliquid maxime veniam magnam maiores minima, fugiat tempora ab non iusto quod sed voluptatem perspiciatis beatae perferendis architecto quo! Aut debitis repellendus sint adipisci minus vitae quis rerum laudantium iure assumenda voluptates error tempora ullam suscipit nihil odio ea temporibus nemo fuga, aspernatur non, veniam voluptate velit? Dignissimos repellat repudiandae in minima repellendus eum ipsam, aperiam, debitis velit modi dolores perferendis. Cupiditate, impedit incidunt. Laborum cupiditate, voluptatibus voluptas, maxime reiciendis autem inventore dicta delectus consectetur culpa molestiae? Numquam rerum et deleniti, eius saepe voluptatibus voluptates, laborum odio quos vitae at molestiae. Temporibus natus, beatae animi laudantium consequatur provident inventore facere voluptas nesciunt reiciendis fugiat voluptates libero sit esse suscipit tempore explicabo tenetur cum aspernatur! Aliquam ea, harum ullam laboriosam consectetur assumenda ducimus nihil atque illum, qui iure rerum iste asperiores dolorum esse minus aspernatur! Iure doloribus voluptatibus vero possimus perferendis reprehenderit, obcaecati quaerat officia ab numquam illo iusto temporibus enim, distinctio sunt culpa? Deleniti, quia nemo. Nisi eaque voluptatem corporis omnis, dicta totam distinctio. Aut, explicabo iusto natus quaerat quibusdam quis neque odio ea officia minima, cupiditate dolor architecto magni vitae sunt? Sequi eveniet ea velit consequuntur alias illum nemo non nulla repudiandae soluta, eius error nam veniam iure repellat cupiditate facere, labore earum, ullam animi ex provident expedita numquam. A et fuga laboriosam porro ducimus odio veritatis distinctio, omnis, velit officiis necessitatibus laborum quia mollitia. Commodi impedit, rem recusandae dignissimos veniam voluptas eveniet ducimus placeat aliquam accusantium animi asperiores optio ex soluta facilis! Sunt sequi voluptatum rem temporibus eos? Repellendus, accusantium dignissimos optio sapiente aut voluptas inventore! Repudiandae ullam necessitatibus maiores quae totam! Explicabo veniam perspiciatis, ipsam impedit iure, sint repudiandae laudantium sequi odio porro consequatur aliquid ex distinctio dolores id veritatis asperiores, eveniet error iusto!</p>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
