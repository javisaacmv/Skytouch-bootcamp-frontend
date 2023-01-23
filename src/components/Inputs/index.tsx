import {
  createStyles,
  Select,
  SelectProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
// import { DatePicker } from '@mantine/dates';

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    width: "20rem",
  },

  input: {
    height: "auto",

    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export function ContainedTextInput(props: TextInputProps) {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();

  return (
    <TextInput
      {...props}
      classNames={classes}
      m="1rem"
      data-testid={`contained-input-${props.label}`}
    />
  );
}

// export function ContainedSelectInput(props: TextInputProps & SelectProps) {
//   // You can add these classes as classNames to any Mantine input, it will work the same
//   const { classes } = useStyles();

//   return (
//     <Select
//       style={{ marginTop: 20, zIndex: 2 }}
//       {...props}
//       classNames={classes}
//     />
//   );
// }
