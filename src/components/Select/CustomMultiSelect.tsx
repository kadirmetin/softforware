import { forwardRef, FC, ReactNode } from "react";
import { useSelectStyles } from "./Select.styles";
import {
  Box,
  CloseButton,
  Flex,
  MultiSelect,
  type MultiSelectValueProps,
  rem,
  type SelectItemProps,
} from "@mantine/core";
import { possibleTechnos } from "~/core/technos";

interface Props {
  formElement: {
    value: string[];
    onChange: (value: string[]) => void;
    checked?: boolean;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
  };
}

export const CustomMultiSelect: FC<Props> = ({ formElement }) => {
  const { classes } = useSelectStyles();

  return (
    <MultiSelect
      className={classes.multiSelect}
      data={possibleTechnos}
      label="Technos"
      placeholder="Pick technos (max: 3)"
      clearButtonProps={{ "aria-label": "Clear selection" }}
      clearable
      itemComponent={Item}
      valueComponent={Value}
      {...formElement}
    />
  );
};
// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, SelectItemProps & { icon: ReactNode }>(
  ({ label, icon, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Flex align="center">
        <Box mr={10}>{icon}</Box>
        <div>{label}</div>
      </Flex>
    </div>
  )
);

const Value = ({
  label,
  icon,
  onRemove,
  ...others
}: MultiSelectValueProps & { value: string; icon: ReactNode }) => (
  <div {...others}>
    <Box
      sx={(theme) => ({
        display: "flex",
        cursor: "default",
        alignItems: "center",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        border: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[4]
        }`,
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.sm,
      })}
    >
      <Box mr={10}>{icon}</Box>
      <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </Box>
  </div>
);
