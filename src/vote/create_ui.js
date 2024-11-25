//

function create_ui() {
  createButton('Vote Up').mousePressed(voteUpAction);

  createButton('Down').mousePressed(voteDownAction);

  my.vote_count_span = createSpan('' + my.vote_count);

  createElement('br');

  createSpan('Total Votes ');
  my.vote_total_count_span = createSpan('' + my.vote_total_count);

  createElement('br');

  createButton('Direction').mousePressed(switchDirectionAction);

  createElement('br');

  createButton('Remove App').mousePressed(removeAppAction);

  // // Move the canvas below all the ui elements
  // let body_elt = document.querySelector('body');
  // let main_elt = document.querySelector('main');
  // body_elt.insertBefore(main_elt, null);
}
