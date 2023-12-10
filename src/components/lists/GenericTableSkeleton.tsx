import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface GenericTableSkeletonProps {
  head: string[];
  isEmpty?: boolean;
}

function GenericTableSkeleton({ head, isEmpty }: GenericTableSkeletonProps) {
  return (
    <TableRow>
      {head?.map((title) => (
        <TableCell key={title}>
          <Skeleton height={30} animation={!isEmpty && 'pulse'} variant="rounded" width="100%" />
        </TableCell>
      ))}
    </TableRow>
  );
}

GenericTableSkeleton.defaultProps = {
  isEmpty: false,
};

export default GenericTableSkeleton;
