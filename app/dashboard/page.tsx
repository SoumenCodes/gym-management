"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Users,
  UserCheck,
  Wallet,
  Calendar,
  Eye,
  ArrowUpDown,
} from "lucide-react";

export default function Dashboard() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = months[new Date().getMonth()];

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(currentMonth);
  const [sortAsc, setSortAsc] = useState(true);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      fee: 1000,
      gender: "male",
      photo: "",
      paidMonths: ["September"],
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "8765432109",
      fee: 1200,
      gender: "female",
      photo: "",
      paidMonths: [],
    },
  ]);

  const [viewMember, setViewMember] = useState(null);

  // Filter + Sort
  const filteredMembers = members
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.phone.includes(search)
    )
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // Dashboard calculations
  const totalMembers = members.length;
  const activeMembers = totalMembers;
  const feesPending = members.filter(
    (m) => !m.paidMonths.includes(month)
  ).length;
  const feesCollected = members
    .filter((m) => m.paidMonths.includes(month))
    .reduce((sum, m) => sum + m.fee, 0);

  // Add new member handler
  const handleAddMember = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember = {
      id: Date.now(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      fee: Number(formData.get("fee")),
      photo: formData.get("photo")
        ? URL.createObjectURL(formData.get("photo"))
        : "",
      paidMonths: [],
    };
    setMembers((prev) => [...prev, newMember]);
    e.currentTarget.reset();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Members</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalMembers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Members</CardTitle>
            <UserCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeMembers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fees Pending ({month})</CardTitle>
            <Wallet className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{feesPending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fees Collected ({month})</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{feesCollected}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />

        <div className="flex gap-3">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Button>

          {/* Add Member Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <Input name="name" placeholder="Full Name" required />
                <Input name="phone" placeholder="Phone Number" required />
                <Select name="gender">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  name="fee"
                  placeholder="Fee Amount"
                  required
                />
                <Input type="file" name="photo" accept="image/*" />
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status ({month})</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((m) => {
                const hasPaid = m.paidMonths.includes(month);
                return (
                  <TableRow key={m.id}>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.phone}</TableCell>
                    <TableCell>{hasPaid ? "Paid" : "Pending"}</TableCell>
                    <TableCell>
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground">No Photo</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        variant={hasPaid ? "secondary" : "default"}
                        size="sm"
                        onClick={() =>
                          setMembers((prev) =>
                            prev.map((mem) =>
                              mem.id === m.id
                                ? {
                                    ...mem,
                                    paidMonths: hasPaid
                                      ? mem.paidMonths.filter(
                                          (pm) => pm !== month
                                        )
                                      : [...mem.paidMonths, month],
                                  }
                                : mem
                            )
                          )
                        }
                      >
                        {hasPaid ? "Mark Pending" : "Mark Paid"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMember(m)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View/Edit Member Dialog */}
      <Dialog open={!!viewMember} onOpenChange={() => setViewMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Member Profile</DialogTitle>
          </DialogHeader>
          {viewMember && (
            <div className="space-y-4">
              <img
                src={viewMember.photo || "https://via.placeholder.com/100"}
                alt={viewMember.name}
                className="h-24 w-24 rounded-full object-cover mx-auto"
              />
              <Input
                defaultValue={viewMember.name}
                onChange={(e) =>
                  setViewMember({ ...viewMember, name: e.target.value })
                }
              />
              <Input
                defaultValue={viewMember.phone}
                onChange={(e) =>
                  setViewMember({ ...viewMember, phone: e.target.value })
                }
              />
              <Input
                type="number"
                defaultValue={viewMember.fee}
                onChange={(e) =>
                  setViewMember({ ...viewMember, fee: Number(e.target.value) })
                }
              />
              <Button
                onClick={() => {
                  setMembers((prev) =>
                    prev.map((m) => (m.id === viewMember.id ? viewMember : m))
                  );
                  setViewMember(null);
                }}
                className="w-full"
              >
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
