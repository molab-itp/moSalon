//

function create_panes() {
  create_pane_primary();
  create_pane_secondary();
}

function create_pane_primary() {
  let backgImg = my.backgImg;

  let x0 = 0;
  let y0 = my.height * my.primaryPortion;
  let z0 = 1;
  let height = my.height * (1 - my.primaryPortion);

  let width = my.width;
  let refBox = my.refBox;
  let regionIndex = 0;
  let focsRect_stroke = 'black';
  let focsRect_strokeWeight = 4;

  my.pane0 = new Pane({
    backgImg,
    x0,
    y0,
    z0,
    width,
    height,
    refBox,
    regionIndex,
    focsRect_stroke,
    focsRect_strokeWeight,
  });
}

function create_pane_secondary() {
  let backgImg = my.backgImg;

  let x0 = 0;
  let y0 = 0;
  let z0 = 1;
  let height = my.height * my.primaryPortion;

  let width = my.width;
  let initCentered = 0;
  let refBox = my.refBox;
  let regionIndex = 1;
  let focsRect_stroke = 'black';
  let focsRect_strokeWeight = 4;

  my.pane1 = new Pane({
    backgImg,
    x0,
    y0,
    z0,
    width,
    height,
    initCentered,
    refBox,
    regionIndex,
    focsRect_stroke,
    focsRect_strokeWeight,
  });
}
