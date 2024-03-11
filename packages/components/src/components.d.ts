import * as components from '.';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    weuiIcon: typeof components.Icon;
    weuiButton: typeof components.Button;
    weuiSlider: typeof components.Slider;
    weuiLoading: typeof components.Loading;
    weuiProgress: typeof components.Progress;
    weuiBadge: typeof components.Badge;
    weuiArticle: typeof components.Article;
    weuiFlex: typeof components.Flex;
    weuiFlexItem: typeof components.FlexItem;
    weuiFooter: typeof components.Footer;
    weuiFooterLink: typeof components.FooterLink;
    weuiGrids: typeof components.Grids;
    weuiGrid: typeof components.Grid;
    weuiLoadmore: typeof components.Loadmore;
    weuiCells: typeof components.Cells;
    weuiCell: typeof components.Cell;
    weuiToast: typeof components.Toast;
    weuiPanel: typeof components.Panel;
    weuiMediaBox: typeof components.MediaBox;
    weuiPreview: typeof components.Preview;
    weuiPreviewItem: typeof components.PreviewItem;
    weuiPreviewBtn: typeof components.PreviewBtn;
    weuiSteps: typeof components.Steps;
    weuiStepItem: typeof components.StepItem;
    weuiMask: typeof components.Mask;
    weuiActionSheet: typeof components.ActionSheet;
    weuiDialog: typeof components.Dialog;
    weuiHalfScreenDialog: typeof components.HalfScreenDialog;
    weuiMsg: typeof components.Msg;
    weuiAlert: typeof components.Alert;
    weuiNavbar: typeof components.NavBar;
    weuiNavbarItem: typeof components.NavBarItem;
    weuiTabbar: typeof components.TabBar;
    weuiTabbarItem: typeof components.TabBarItem;
    weuiSearchbar: typeof components.SearchaBar;
  }
}
export {};