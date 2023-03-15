import type { App } from "vue";
import "vant/lib/index.css";
import {
  Button,
  Cell,
  CellGroup,
  Toast,
  Picker,
  Icon,
  DatePicker,
  Form,
  Field,
  Popup,
  Tag,
  Search,
  Divider,
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
  List,
  Empty,
} from "vant";
const vantElement = [
  Button,
  Cell,
  CellGroup,
  Toast,
  Picker,
  Icon,
  DatePicker,
  Form,
  Field,
  Popup,
  Tag,
  Search,
  Divider,
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
  List,
  Empty,
];
export function registerVant(app: App) {
  for (const element of vantElement) {
    app.component(element.name, element);
  }
}
