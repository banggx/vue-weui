import { ShallowRef, watch, nextTick } from 'vue';

export function useSlideDialog(
  visible: ShallowRef<boolean>,
  dialogRef: ShallowRef<HTMLElement | null>,
  closeCallback: () => void
) {
  let js_line: HTMLElement | null = null;
  let js_arrow: HTMLElement | null = null;
  let start = 0;
  let end = 0;

  const touchStartHandler = (event: TouchEvent) => {
    event.preventDefault();
    start = event.changedTouches[0].clientY;
  };

  const touchMoveHandler = (event: TouchEvent) => {
    event.preventDefault();
    const move = event.changedTouches[0].clientY - start;
    if (move > 0) {
      dialogRef.value!.style.transform = 'translate3d(0, ' + move + 'px, 0)';

      let percent = move / 56;
      percent = percent > 1 ? 1 : percent;
      js_line!.style.height = 4 + (16 - 4) * percent + 'px';
      js_line!.style.borderRadius = 2 + (12 - 2) * percent + 'px';

      if (percent >= 0.5) {
        const pear = (percent - 0.5) / 0.5;
        js_arrow!.style.opacity = pear.toString();
      }
    } else {
      dialogRef.value!.style.transform = 'translate3d(0,0,0)';
      js_line!.style.height = 4 + 'px';
      js_line!.style.borderRadius = 2 + 'px';
      js_arrow!.style.opacity = '0';
    }
  };

  const touchEndHandler = (event: TouchEvent) => {
    event.preventDefault();
    const move = event.changedTouches[0].clientY - start;
    end = move;
    const max = 56;
    dialogRef.value!.style.transition = 'transform .3s';

    if (end < max) {
      dialogRef.value!.style.transform = 'translate3d(0,0,0)';
      js_line!.style.height = 4 + 'px';
      js_line!.style.borderRadius = 2 + 'px';
      js_arrow!.style.opacity = '0';
      end = 0;
    } else if (end >= max) {
      closeCallback();
      dialogRef.value!.style.transform = 'translate3d(0, 100%, 0)';
    }
  };

  watch(
    visible,
    (value) => {
      if (!value) {
        dialogRef.value?.removeEventListener('touchstart', touchStartHandler);
        dialogRef.value?.removeEventListener('touchmove', touchMoveHandler);
        dialogRef.value?.removeEventListener('touchend', touchEndHandler);
        js_line = null;
        js_arrow = null;
      } else {
        nextTick(() => {
          start = 0;
          end = 0;
          js_line = dialogRef.value?.querySelector('#js_line') ?? null;
          js_arrow = dialogRef.value?.querySelector('#js_arrow') ?? null;
          if (dialogRef.value && js_line && js_arrow) {
            dialogRef.value.addEventListener('touchstart', touchStartHandler);
            dialogRef.value.addEventListener('touchmove', touchMoveHandler);
            dialogRef.value.addEventListener('touchend', touchEndHandler);
          }
        });
      }
    },
    {
      immediate: true
    }
  );
}
